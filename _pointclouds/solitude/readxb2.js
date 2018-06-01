var fs = require('fs');

var position = 64 + 1000000*16;
var num = 16;
var length = 16 * num;

fs.open('./solitude-10cm.xb2', 'r', function(err, fd) {
    if(err) {
        return console.error(err);
    }

    var buffer = new Buffer(length);

    fs.read(fd, buffer, 0, length, position, function(err, bytesRead) {
        if(err) {
            return console.error(err);
        }

        for (var i = 0; i < num; i++) {
            console.log(buffer.readUInt8(i*16 + 12), buffer.readUInt8(i*16 + 13), buffer.readUInt8(i*16 + 14), buffer.readUInt8(i*16 + 15));
        }

        // console.log(buffer.readDoubleBE(0));
        // console.log(buffer.readDoubleBE(8));
    });
});
