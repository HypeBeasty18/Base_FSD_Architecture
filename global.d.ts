declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg" {
	import React from "react"
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
	export default SVG
}

declare module "*.css" {
	const classes: { [key: string]: string }
	export default classes
}

declare module "*.ttf" {
	const value: string
	export default value
}

declare module "*.woff" {
	const value: string
	export default value
}

declare module "*.woff2" {
	const value: string
	export default value
}

declare const  __ENV__: 'production' | 'development'