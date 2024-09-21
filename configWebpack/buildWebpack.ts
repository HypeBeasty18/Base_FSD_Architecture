import { EsbuildPlugin } from "esbuild-loader"
import TerserPlugin from "terser-webpack-plugin"
import webpack from "webpack"

import { buildDevServer } from "./buildDevServer"
import { buildLoaders } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolver"
import { BuildOptions } from "./types"

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { mode, paths } = options

	const isDev = mode === "development"

	return {
		mode: mode ?? "development",
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: "[contenthash].bundle.js",
			clean: true
		},
		optimization: {
			minimize: !isDev,
			minimizer: !isDev
				? [
						new EsbuildPlugin({
							target: "es2015",
							css: true
						})
					]
				: [],
			splitChunks: {
				cacheGroups: {
					node_vendors: {
						test: /[\\/]node_modules[\\/]/,
						chunks: "all",
						priority: 1
					}
				}
			}
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		devServer: isDev ? buildDevServer(options) : undefined
	}
}
