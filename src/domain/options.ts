export interface AkheromOptions {
	width: AkheromOptions.Width;
}

export declare namespace AkheromOptions {
	export type Width = 'auto' | number;

	export type Model = Partial<AkheromOptions>;
}
