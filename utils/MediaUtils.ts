import Mock from 'mockjs'

// 根据长宽生成
export function getOnePic(width: number, height: number, blur?: number, webp?: boolean) {
	// 图片的最长id是1084
	const id = Mock.Random.natural(1, 1084)
	let targetUrl = `https://picsum.photos/id/${id}/${width}/${height}`
	if(blur && blur > 0){
		targetUrl = `${targetUrl}?blur=${blur}`
	}
	if(webp){
		targetUrl = `${targetUrl}.webp`
	}
	return targetUrl
}