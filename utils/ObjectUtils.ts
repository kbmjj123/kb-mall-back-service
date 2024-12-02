
/**
 * 将一个数组对象转成一个以其中的某个key作为对象的key的对象
 * @param array 待转化的数组
 * @param key 目标key
 * @returns 一个对象，以 key 对应的值作为新对象的键
 * @throws 如果传入的 array 不是数组，抛出错误
 */
export const convertArrayToObject = <T extends Record<string, any>>(
	array: Array<T>,
	key: keyof T
): Record<string, T> => {
	if (!Array.isArray(array)) {
		throw new Error('必须传递一个数组对象');
	}
	return array.reduce((result, item) => {
		const objKey = item[key];
		if (objKey === undefined || objKey === null) {
			throw new Error(`对象中的 key "${String(key)}" 值无效`);
		}
		result[String(objKey)] = item;
		return result;
	}, {} as Record<string, T>);
};