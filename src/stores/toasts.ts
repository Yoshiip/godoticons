import { writable } from 'svelte/store';
import Toast from '../Toast';
import type { ToastType } from '../ToastType';

export const toasts = writable<Toast[]>([]);

export const addToast = (message: string, type: ToastType, dismissible = true, timeout = 3000) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	// Setup some sensible defaults for a toast.
	const toast = new Toast(id, message, type, dismissible, timeout);

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [toast, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((toast) => toast.id !== id));
};
