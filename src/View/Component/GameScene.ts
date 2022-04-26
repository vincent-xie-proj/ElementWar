/**遊戲場景組件 */
class GameScene extends eui.Component implements eui.UIComponent {

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "GameSceneSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		// 物件必須等到uiComplete才能使用
		this.init();
	}

	/**初始化 */
	public init(): void {
		const role: Role = new Role("roleOur01");
		role.x = role.y = 200;
		this.addChild(role);
		role.play(-1);

		const roleE: Role = new Role("roleEnemy01");
		roleE.x = roleE.y = 400;
		this.addChild(roleE);
		roleE.play(-1);
	}
}