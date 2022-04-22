class Role extends eui.Component implements eui.UIComponent {
	private tweenGroups: egret.tween.TweenGroup[];
	public constructor(skinName: string, tweenGroups: string[] = []) {
		super();
		this.once(eui.UIEvent.COMPLETE, () => {
			console.log("UIEvent COMPLETE");
		}, this);
		this.skinName = skinName;
		this.tweenGroups = tweenGroups.map(name => this[name]);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		console.log("childrenCreated");
		for (const tweenGroup of this.tweenGroups) {
			tweenGroup.play();
		}
	}

	/**tweenGroup 重新播放 */
	private onTweenGroupCompletePlay(e: egret.Event): void {
		this["play"](0);
	}
}