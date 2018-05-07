// 数据库
// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模式loginSchema **************/

const adminSchema = mongoose.Schema({
	account: String,
	password: String,
	level: Number
})

const stuffSchema = mongoose.Schema({
	account: String,
	password: String,
	tel: String,
	banner: Boolean,
	onLine: Boolean,
	level: Number,
	startTime: Number,
	Ips: Array
});

const outerSchema = mongoose.Schema({
	name: String,
	EncryptedName: String,
	password: String,
	stuffId: String,
	stuffName: String,
	startTime: Number,
	level: Number
});

const roleSchema = mongoose.Schema({
	name: String
})

const userRoleSchema = mongoose.Schema({
	userId: String,
	roleId: String
})

const accessSchema = mongoose.Schema({
	url: String
})

const roleAccessSchema = mongoose.Schema({
	roleId: String,
	AccessId: Array
})
/************** 定义模型Model **************/
const Models = {
	Admin : mongoose.model('Admin', adminSchema),
  Stuff : mongoose.model('Stuff', stuffSchema),
	Outer : mongoose.model('Outer', outerSchema),
	Role : mongoose.model('Role', roleSchema),
	UserRole : mongoose.model('UserRole', userRoleSchema),
	Access : mongoose.model('Access', accessSchema),
	RoleAccess : mongoose.model('RoleAccess', roleAccessSchema)
}

module.exports = Models;