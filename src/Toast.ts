import type { ToastType } from './ToastType';

export default class Toast {
	public id: number;
	public message: string;
	public type: ToastType;
	public dismissible: boolean;
	public timeout: number;

	constructor(id: number, message: string, type: ToastType, dismissible = true, timeout = 3000) {
		this.id = id;
		this.message = message;
		this.type = type;
		this.dismissible = dismissible;
		this.timeout = timeout;
	}
}
