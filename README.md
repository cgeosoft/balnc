# Balnc

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/79c2730e3816489d9a9b10f506cc3ac5)](https://www.codacy.com/manual/xris-georgiou/balnc?utm_source=github.com&utm_medium=referral&utm_content=ChristosGeorgiou/balnc&utm_campaign=Badge_Grade) [![Netlify Status](https://api.netlify.com/api/v1/badges/085594e9-5f2e-4a4c-9dd4-148c0e889869/deploy-status)](https://app.netlify.com/sites/balnc/deploys)

> WARNING: NOT FOR PRODUCTION USE
> This is more of an experiment rather than a working product. New and untested libraries are been used and no security audit have been done.

![screenshot](https://raw.githubusercontent.com/ChristosGeorgiou/balnc/master/assets/screenshot.png)

Balnc (balance) is an free and open source business management suite for small organizations and freelancers.
The primary feature of balnc is the offline first approach as it may run fully at user's browser or be downloaded in all major operating systems.
Data are stored ether at browser local database or in user's own infrastructure bypassing any cloud provider.

## Features

- Offline-first application build with web technologies
- All features and modules are **running at user's machine** with improved performance and security
- Sync data automatically and securely with private owned remote databases
- All data may be stored in a **browser database** without requiring a database server
- Optional **server** is provided for support of syncing data over the network for backup and multi-user environments

| Name          | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| Business      | Manage customers, orders, invoices and other daily task for small business and freelancers. |
| Projects      | Manage projects and tasks. Use this with sync and collaborate with others.                  |
| Presentations | Create presentations for clients. Use this with sync to have them in tablet and TV.         |
| Boards        | An internal collaboration tool for communication and sharing files.                         |
| Documents     | -                                                                                           |

## Try It

You may use the latest develop version at [https://balnc.cgeosoft.com](https://balnc.cgeosoft.com)

If you want to try it local:

```bash
# install lerna globaly
npm i -g lerna

# clone the repo
git clone https://github.com/christosgeorgiou/balnc
cd balnc
lerna bootstrap
npm start
```

## License

The MIT License (MIT)
