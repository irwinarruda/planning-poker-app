export type SocketResponse<D> = {
	status: 'success' | 'error';
	data: D | string;
};
