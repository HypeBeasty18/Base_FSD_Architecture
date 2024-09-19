import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

import { BuildOptions } from "./types"

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
		open: true,
		// если раздавать статику через nginx То надо делать проксирование на index.html
		historyApiFallback: true,
		hot: true
	}
}
