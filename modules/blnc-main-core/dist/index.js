var mainCore;
(function (mainCore) {
    class main {
    }
    mainCore.main = main;
    var testEnum;
    (function (testEnum) {
        testEnum[testEnum["Up"] = 0] = "Up";
        testEnum[testEnum["Down"] = 1] = "Down";
        testEnum[testEnum["Left"] = 2] = "Left";
        testEnum[testEnum["Right"] = 3] = "Right";
    })(testEnum = mainCore.testEnum || (mainCore.testEnum = {}));
})(mainCore || (mainCore = {}));
//# sourceMappingURL=index.js.map