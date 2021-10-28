

export const validatePassword = (password: string) => {
    let error = [];
    if (!password || password.length < 5) {
        error.push("password is to shord")
    }

    return error;
}

export const validateUsername = (username: string) => {
    let error = [];
    if (!username || username.length < 5) {
        error.push("userName is to short")
    }

    return error;
}