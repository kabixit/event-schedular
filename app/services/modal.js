import Service from '@ember/service';
import { later } from '@ember/runloop';

export default Service.extend({
  show(templateName, options = {}) {
    // Implement your modal show logic here
    // This is a basic implementation using Bootstrap modals
    const modalElement = document.getElementById(`${templateName}-modal`);
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      if (options.title) {
        const titleElement = modalElement.querySelector('.modal-title');
        if (titleElement) {
          titleElement.textContent = options.title;
        }
      }
      modal.show();
    }
  }
});