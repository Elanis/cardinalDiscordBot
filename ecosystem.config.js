module.exports = {
  apps : [{
    name: 'discord-bot',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: true,
    kill_timeout: 10000, //10s
  }],
};
