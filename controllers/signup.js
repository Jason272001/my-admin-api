const handleSignup = (req, res, db, bcrypt) => {
  
    const { email, name, password } = req.body;

    if (!email || !name || !password)
    {
       return res.status(400).json('incorrect form submission');
    
}


    else {
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            access_number: hash,
            email: email,

        })
            .into('access_login')
            .returning('email')
            .then(loginEmail => {
            
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name
                       
                    }).then(user => {
                        res.json(user[0]);
                    })
                        
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })


        .catch(err => res.status(400).json('error in register'))

}

}

module.exports = {
    handleSignup
}