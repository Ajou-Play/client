export const socketDataPasing = (data: any) => JSON.parse(JSON.parse(JSON.stringify(data.body)));
