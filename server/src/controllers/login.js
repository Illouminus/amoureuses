const bcrypt = require('bcrypt');
const { User } = require('../../db/models')

const login = async (req, res) => {
	console.log(req.body);
	const { login, password } = req.body
	try {
		const identified = await User.findOne({ where: { login } })
		console.log(identified);
		if (identified) {
			const passCheck = await bcrypt.compare(password, identified.password)
			console.log(passCheck);
			if (passCheck) {
				req.session.user = identified.login
				req.session.save(() => {
					res.json({ status: true })
				})
			} else {
				res.json({ status: false })
			}
		} else {
			res.json({ status: 'wrong' })
		}
	} catch (error) {
		console.log(error)
	}
}


const register = async (req, res) => {
	const { login, password } = req.body
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const newUser = await User.create({
			login,
			password: hashedPassword
		});
	} catch (error) {
		console.log(error);
	}
}

const logout = (req, res) => {
			// Destroying the session
			req.session.destroy((err) => {
				if (err) {
					return res.status(500).send("Error occured while logging out.");
				} else {
					return res.status(200).send("Successfully logged out.");
				}
			});
}




module.exports = { login, register, logout }