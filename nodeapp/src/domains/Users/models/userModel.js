class User {
    constructor(userId, loginId, password, name, email, phone, status, gender, grade,created_at,pw_updated_at) {
        this.userId = userId;
        this.loginId = loginId;
        this.password = password;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.status = status;
		this.gender = gender;
		this.grade = grade;
		this.created_at = created_at;
		this.pw_updated_at = pw_updated_at;
    }	
}

export default User;