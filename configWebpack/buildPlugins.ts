import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { EsbuildPlugin } from "esbuild-loader"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import webpack, { Configuration, DefinePlugin } from "webpack"

import { BuildOptions } from "./types"

export function buildPlugins({
	mode,
	paths
}: BuildOptions): Configuration["plugins"] {
	const isDev = mode === "development"
	const isProd = mode === "production"

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, "favicon.ico")
		}),
		new EsbuildPlugin({
			define: {
				__ENV__: JSON.stringify(mode)
			}
		})
	]

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin())
		/** Выносит проверку типов в отдельный процесс: не нагружая сборку */
		plugins.push(new ForkTsCheckerWebpackPlugin())
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css"
			})
		)
	}
	return plugins
}
