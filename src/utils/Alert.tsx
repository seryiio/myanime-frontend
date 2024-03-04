import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function showAlert(message: string, icon: SweetAlertIcon): void {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: message,
        icon: icon,
    });
}
