import path from "path"
import webpack from "webpack"

import { buildWebpack } from "./configWebpack/buildWebpack"
import { BuildMode, BuildPaths } from "./configWebpack/types"

const MODE: BuildMode = (process.env.MODE as BuildMode) || "development"

const PORT: number = Number(process.env.PORT) || 8000

export default () => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "app", "index.ts"),
		html: path.resolve(__dirname, "public", "index.html"),
		public: path.resolve(__dirname, "public"),
		output: path.resolve(__dirname, "dist"),
		src: path.resolve(__dirname, "src")
	}

	const config: webpack.Configuration = buildWebpack({
		port: PORT,
		mode: MODE,
		paths
	})

	config.plugins?.push(
		new webpack.container.ModuleFederationPlugin({
			name: "administration",
			filename: "remoteEntry.js",
			exposes: {} //указать экспортируемые компоненты
			// shared: {
			// 	react: {
			// 		singleton: true,
			// 		requiredVersion: "18.3.1"
			// 	},
			// 	"react-dom": {
			// 		singleton: true,
			// 		requiredVersion: "18.3.1"
			// 	},
			// 	"react-router-dom": {
			// 		singleton: true,
			// 		requiredVersion: "6.26.2"
			// 	}
			// }
		})
	)

	return config
}
