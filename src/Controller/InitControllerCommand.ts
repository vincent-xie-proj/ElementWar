/**初始化 Controller command */
class InitControllerCommand extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void {
        this.facade.registerCommand(Notification.GAME_START_EVENT, GameStartCommand)

        this.sendNotification(Notification.INIT_EVENT)
    }
}