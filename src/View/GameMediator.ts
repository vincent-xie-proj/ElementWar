/**遊戲 Mediator */
class GameMediator extends puremvc.Mediator {
    /**遊戲場景 */
    private gameScene: GameScene = new GameScene();
    public constructor(mediatorName?: string, viewComponent?: Main) {
        super(mediatorName, viewComponent);
    }

    /**主場景 */
    public getStage(): Main {
        return this.viewComponent as Main;
    }

    public listNotificationInterests(): string[] {
        const list: string[] = super.listNotificationInterests();
        list.push(Notification.INIT_EVENT);
        list.push(Notification.LOADING_EVENT);
        list.push(Notification.GAME_START_EVENT);
        return list;
    }

    public handleNotification(notification: puremvc.INotification): void {
        const name: string = notification.getName();
        const body: any = notification.getBody();
        const stage: Main = this.getStage();
        switch (name) {
            case Notification.INIT_EVENT:
                {
                    stage.addChild(this.gameScene);
                }
                break;
            case Notification.LOADING_EVENT:
                {

                }
                break;
            case Notification.GAME_START_EVENT:
                {
                }
                break;
        }
    }
}