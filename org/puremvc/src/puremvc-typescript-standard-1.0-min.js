var b; (function (d) {
    var c = (function () {
        function e(f, g) { this.notify = null; this.context = null; this.setNotifyMethod(f); this.setNotifyContext(g) } e.prototype.getNotifyMethod = function () { return this.notify }; e.prototype.setNotifyMethod = function (f) { this.notify = f }; e.prototype.getNotifyContext = function () { return this.context }; e.prototype.setNotifyContext = function (f) { this.context = f }; e.prototype.notifyObserver = function (f) {
            this.getNotifyMethod().call(this.getNotifyContext(), f)
        }; e.prototype.compareNotifyContext = function (f) { return f === this.context }; return e
    })(); d.Observer = c
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() { this.mediatorMap = null; this.observerMap = null; if (f.instance) { throw Error(f.SINGLETON_MSG) } f.instance = this; this.mediatorMap = {}; this.observerMap = {}; this.initializeView() } f.prototype.initializeView = function () { }; f.prototype.registerObserver = function (h, g) { var i = this.observerMap[h]; if (i) { i.push(g) } else { this.observerMap[h] = [g] } }; f.prototype.removeObserver = function (k, j) {
            var l = this.observerMap[k];
            var h = l.length; while (h--) { var g = l[h]; if (g.compareNotifyContext(j)) { l.splice(h, 1); break } } if (l.length == 0) { delete this.observerMap[k] }
        }; f.prototype.notifyObservers = function (l) { var k = l.getName(); var n = this.observerMap[k]; if (n) { var m = n.slice(0); var g = m.length; for (var j = 0; j < g; j++) { var h = m[j]; h.notifyObserver(l) } } }; f.prototype.registerMediator = function (l) {
            var j = l.getMediatorName(); if (this.mediatorMap[j]) { return } this.mediatorMap[j] = l; var m = l.listNotificationInterests(); var g = m.length; if (g > 0) {
                var h = new c.Observer(l.handleNotification, l);
                for (var k = 0; k < g; k++) { this.registerObserver(m[k], h) }
            } l.onRegister()
        }; f.prototype.retrieveMediator = function (g) { return this.mediatorMap[g] || null }; f.prototype.removeMediator = function (g) { var j = this.mediatorMap[g]; if (!j) { return null } var k = j.listNotificationInterests(); var h = k.length; while (h--) { this.removeObserver(k[h], j) } delete this.mediatorMap[g]; j.onRemove(); return j }; f.prototype.hasMediator = function (g) { return this.mediatorMap[g] != null }; f.SINGLETON_MSG = "View singleton already constructed!"; f.instance = null;
        f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.View = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() { this.view = null; this.commandMap = null; if (f.instance) { throw Error(f.SINGLETON_MSG) } f.instance = this; this.commandMap = {}; this.initializeController() } f.prototype.initializeController = function () { this.view = c.View.getInstance() }; f.prototype.executeCommand = function (g) { var i = this.commandMap[g.getName()]; if (i) { var h = new i(); h.execute(g) } }; f.prototype.registerCommand = function (g, h) {
            if (!this.commandMap[g]) {
                this.view.registerObserver(g, new c.Observer(this.executeCommand, this))
            } this.commandMap[g] = h
        }; f.prototype.hasCommand = function (g) { return this.commandMap[g] != null }; f.prototype.removeCommand = function (g) { if (this.hasCommand(g)) { this.view.removeObserver(g, this); delete this.commandMap[g] } }; f.instance = null; f.SINGLETON_MSG = "Controller singleton already constructed!"; f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.Controller = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function f() {
        this.proxyMap = null; if (f.instance) {
            throw Error(f.SINGLETON_MSG)
        } f.instance = this; this.proxyMap = {}; this.initializeModel()
        } f.prototype.initializeModel = function () { }; f.prototype.registerProxy = function (g) { this.proxyMap[g.getProxyName()] = g; g.onRegister() }; f.prototype.removeProxy = function (h) { var g = this.proxyMap[h]; if (g) { delete this.proxyMap[h]; g.onRemove() } return g }; f.prototype.retrieveProxy = function (g) { return this.proxyMap[g] || null }; f.prototype.hasProxy = function (g) { return this.proxyMap[g] != null }; f.SINGLETON_MSG = "Model singleton already constructed!"; f.instance = null;
        f.getInstance = function e() { if (!f.instance) { f.instance = new f() } return f.instance }; return f
    })(); c.Model = d
})(b || (b = {})); var b; (function (c) {
    var d = (function () {
        function e(g, f, h) { if (typeof f === "undefined") { f = null } if (typeof h === "undefined") { h = null } this.name = null; this.body = null; this.type = null; this.name = g; this.body = f; this.type = h } e.prototype.getName = function () { return this.name }; e.prototype.setBody = function (f) { this.body = f }; e.prototype.getBody = function () { return this.body }; e.prototype.setType = function (f) {
        this.type = f
        }; e.prototype.getType = function () { return this.type }; e.prototype.toString = function () { var f = "Notification Name: " + this.getName(); f += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString()); f += "\nType:" + ((this.getType() == null) ? "null" : this.getType()); return f }; return e
    })(); c.Notification = d
})(b || (b = {})); var b; (function (d) {
    var c = (function () {
        function e() { this.model = null; this.view = null; this.controller = null; if (e.instance) { throw Error(e.SINGLETON_MSG) } e.instance = this; this.initializeFacade() } e.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController(); this.initializeView()
        }; e.prototype.initializeModel = function () { if (!this.model) { this.model = d.Model.getInstance() } }; e.prototype.initializeController = function () { if (!this.controller) { this.controller = d.Controller.getInstance() } }; e.prototype.initializeView = function () { if (!this.view) { this.view = d.View.getInstance() } }; e.prototype.registerCommand = function (g, h) { this.controller.registerCommand(g, h) }; e.prototype.removeCommand = function (g) { this.controller.removeCommand(g) }; e.prototype.hasCommand = function (g) {
            return this.controller.hasCommand(g)
        }; e.prototype.registerProxy = function (g) { this.model.registerProxy(g) }; e.prototype.retrieveProxy = function (g) { return this.model.retrieveProxy(g) }; e.prototype.removeProxy = function (h) { var g; if (this.model) { g = this.model.removeProxy(h) } return g }; e.prototype.hasProxy = function (g) { return this.model.hasProxy(g) }; e.prototype.registerMediator = function (g) { if (this.view) { this.view.registerMediator(g) } }; e.prototype.retrieveMediator = function (g) { return this.view.retrieveMediator(g) }; e.prototype.removeMediator = function (g) {
            var h;
            if (this.view) { h = this.view.removeMediator(g) } return h
        }; e.prototype.hasMediator = function (g) { return this.view.hasMediator(g) }; e.prototype.notifyObservers = function (g) { if (this.view) { this.view.notifyObservers(g) } }; e.prototype.sendNotification = function (h, g, i) { if (typeof g === "undefined") { g = null } if (typeof i === "undefined") { i = null } this.notifyObservers(new d.Notification(h, g, i)) }; e.SINGLETON_MSG = "Facade singleton already constructed!"; e.instance = null; e.getInstance = function f() {
            if (!e.instance) {
            e.instance = new e()
            } return e.instance
        }; return e
    })(); d.Facade = c
})(b || (b = {})); var b; (function (d) { var c = (function () { function e() { this.facade = null; this.facade = d.Facade.getInstance() } e.prototype.sendNotification = function (g, f, h) { if (typeof f === "undefined") { f = null } if (typeof h === "undefined") { h = null } this.facade.sendNotification(g, f, h) }; return e })(); d.Notifier = c })(b || (b = {})); var a = this.__extends || function (f, c) { function e() { this.constructor = f } e.prototype = c.prototype; f.prototype = new e() }; var b; (function (d) {
    var c = (function (f) {
        a(e, f);
        function e() { f.call(this); this.subCommands = null; this.subCommands = new Array(); this.initializeMacroCommand() } e.prototype.initializeMacroCommand = function () { }; e.prototype.addSubCommand = function (g) { this.subCommands.push(g) }; e.prototype.execute = function (l) { var j = this.subCommands.slice(0); var g = this.subCommands.length; for (var h = 0; h < g; h++) { var m = j[h]; var k = new m(); k.execute(l) } this.subCommands.splice(0) }; return e
    })(d.Notifier); d.MacroCommand = c
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f() {
            e.apply(this, arguments)
        } f.prototype.execute = function (g) { }; return f
    })(c.Notifier); c.SimpleCommand = d
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f(g, h) { if (typeof g === "undefined") { g = null } if (typeof h === "undefined") { h = null } e.call(this); this.mediatorName = null; this.viewComponent = null; this.mediatorName = (g != null) ? g : f.NAME; this.viewComponent = h } f.prototype.getMediatorName = function () { return this.mediatorName }; f.prototype.getViewComponent = function () { return this.viewComponent }; f.prototype.setViewComponent = function (g) {
        this.viewComponent = g
        }; f.prototype.listNotificationInterests = function () { return new Array() }; f.prototype.handleNotification = function (g) { }; f.prototype.onRegister = function () { }; f.prototype.onRemove = function () { }; f.NAME = "Mediator"; return f
    })(c.Notifier); c.Mediator = d
})(b || (b = {})); var b; (function (c) {
    var d = (function (e) {
        a(f, e); function f(h, g) { if (typeof h === "undefined") { h = null } if (typeof g === "undefined") { g = null } e.call(this); this.proxyName = null; this.data = null; this.proxyName = (h != null) ? h : f.NAME; if (g != null) { this.setData(g) } } f.prototype.getProxyName = function () {
            return this.proxyName
        }; f.prototype.setData = function (g) { this.data = g }; f.prototype.getData = function () { return this.data }; f.prototype.onRegister = function () { }; f.prototype.onRemove = function () { }; f.NAME = "Proxy"; return f
    })(c.Notifier); c.Proxy = d
})(b || (b = {}));