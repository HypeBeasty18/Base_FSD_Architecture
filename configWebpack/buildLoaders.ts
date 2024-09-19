import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshTypeScript from "react-refresh-typescript"
import { ModuleOptions } from "webpack"

import { BuildOptions } from "./types"

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development"

	const assetLoader = {
		test: /\.(jpg|png|gif|pdf)$/,
		use: [
			{
				loader: "file-loader"
			}
		]
	}

	const svgrLoader = {
		test: /\.svg$/i,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true
								}
							}
						]
					}
				}
			}
		]
	}

	const cssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,

			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
					}
				}
			}
		]
	}

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.(js|jsx|tsx|ts)$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
					})
				}
			}
		]
	}

	const esBuildLoader = {
		exclude: /node_modules/,
		test: /\.[jt]sx?$/,
		loader: 'esbuild-loader',
		options: {
			target: 'es2015'
		}
	}

	return [assetLoader, cssLoader, svgrLoader, esBuildLoader]
}
