class Role extends egret.MovieClip {
	public constructor(name: string) {
		const data = RES.getRes(`${name}_mc_json`);
		const texture = RES.getRes(`${name}_tex_png`);
		const movieClipDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
		const movieClipData: egret.MovieClipData = movieClipDataFactory.generateMovieClipData(name);
		super(movieClipData);
	}
}