Accounts.onCreateUser((options, user) => {
    if(user.profile) 
        user.profile.budget = 0;
    else {
        user.profile = {
            budget: 0
        }
    }
    return user;
});