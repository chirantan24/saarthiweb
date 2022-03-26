exports.login_page = function(req,res) {
    let user = req.session.user;
    if(user)
    {
       User.isverified(user.id).then(()=>{
            let token = req.session.token;
            jwt.verify(token,process.env.SECRETKEY,(err,data)=>{
                if(err)
                {
                    res.render('login_page'); 
                }
                else
                {
                    res.redirect(`/user/${req.session.user.id}`);
                }
            })
        })
        .catch((err)=>{
            res.redirect('emailconfirm');
        })        
    }
    else
    {
        res.render('login_page');
    }
    
}

exports.login = function(req,res){
    let user = new User(req.body);
    user.login().then((data)=>{
        //res.send(data);
        let id = data.id.toString();            
        req.session.user = {
            id:id,
            username:data.username,
            email:data.email
        }           
        let token = jwt.sign(req.session.user,process.env.SECRETKEY,{expiresIn:'1d'});
        req.session.token = token;
        User.isverified(id).then(()=>{
            console.log('userlogin verified');

            req.session.save(()=>{
                console.log('redirected to dashboard');
                res.redirect(`/user/${id}`);
            });            
        })
        .catch((err)=>{
            res.render('mailconfirm_page',{err:err});
        })
    }).catch((err)=>{
        res.render('login_page',{err:err});
    })
}

exports.register_page = function(req,res) {
    let token = req.session.token;

    jwt.verify(token,process.env.SECRETKEY,(err,data)=>{
        if(err)
        {
            res.render('register_page'); 
        }
        else
        {
            res.redirect(`/user/${req.session.user.id}`);
        }
    })
}

exports.register = async function(req,res) {
    let user = new User(req.body);
    //console.log(user);
    await user.register().then((data)=>{
        req.session.user = {
            id:data.insertedId.toString(),
            username:user.data.username,
            email:user.data.email,
        }
        let token = jwt.sign(req.session.user,process.env.SECRETKEY,{expiresIn:'1d'})
        req.session.token = token;
        req.session.save(()=>{
            res.redirect('emailconfirm');            
        })
    }).catch((err)=>{
        //res.send(err);
        res.render('register_page',{err:err});
    })
}

exports.logout = function(req,res) {
    req.session.destroy();
    res.redirect('/');
}

exports.authenticateToken = function(req,res,next) {
    let user = req.session.user;
    let token = req.session.token;
    if(user)
    {
        if(token)
        {
            jwt.verify(token,process.env.SECRETKEY,(err,data)=>{
                if(err)
                {
                    return res.send(err);
                }
                next();
            })            
        }
        else
        {
            res.redirect('/');
        }
    }
    else 
    {
        res.redirect('/');
    }
}