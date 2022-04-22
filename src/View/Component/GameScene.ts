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
		const data = RES.getRes("role01_mc_json");
		const txtr = RES.getRes("role01_tex_png");
		const mcdf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		const role: egret.MovieClip = new egret.MovieClip(mcdf.generateMovieClipData("role01"));
		role.x = role.y = 200;
		role.scaleX = -0.3;
		role.scaleY = 0.3;
		this.addChild(role);
		role.play(-1);
	}
}