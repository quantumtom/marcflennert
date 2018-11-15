var bootlint = require('bootlint');

function reporter(lint) {
    console.log(lint.id, lint.message);
}

bootlint.lintHtml("<!DOCTYPE html><html>...", reporter, []); // calls reporter() repeatedly with each lint problem as an argument
