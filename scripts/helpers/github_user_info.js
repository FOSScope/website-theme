'use strict';

const { Octokit } = require("@octokit/rest");

async function getUserName(username) {
    const octokit = new Octokit();

    return await octokit.users.getByUsername({
        username: username
    }).then(({ data }) => {
        console.log('data:', data);
        console.log('data.name:', data.name);
        return data.name;
    }).catch((e) => {
        console.error(e);
    });
}

hexo.extend.helper.register('get_user_name', function(username){
    console.log('username:', username);

    return getUserName(username).then((name) => {
        console.log('name:', name);
        return name;
    }).then((name) => {
        console.log('name:', name);
        return name;
    });
});
