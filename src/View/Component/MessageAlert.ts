/**訊息彈窗 */
class MessageAlert extends eui.Component implements eui.UIComponent {

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "MessageAlertSkin";
	}

	/**元件建立 */
	private uiComplete(e: eui.UIEvent): void {
		this.init();
	}

	/**初始化 */
	public init(): void {
	}
}