const bcrypt = require('bcryptjs');


const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password} = req.body
      console.log(req.body)
     
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const passwordExists = bcrypt.compareSync(password,users[i].passwordHash)
          if (passwordExists){
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
          res.status(200).send(users[i])
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const { username,email,firstName,lastName,password } = req.body

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.passwordHash(password,salt)
        console.log(req.body)

        let users = {
          username,
          email,
          firstName,
          lastName,
          passwordHash,
        
        }

        users.push(req.body)
        let userToReturn = { ...user}
        delete userToReturn.passwordHash
        res.status(200).send(req.body)
  
      }

    }



  



