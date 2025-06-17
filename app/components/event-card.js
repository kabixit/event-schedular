import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card', 'premium-event-card', 'h-100', 'border-0', 'shadow-sm', 'rounded-4', 'p-4', 'position-relative'],

  init() {
    this._super(...arguments);
    this.inputId = `event-title-${this.get('event.id')}`;
  },

  didInsertElement() {
    $(this.element).find('[title]').tooltip();

    if (this.get('editingEventId') === this.get('event.id')) {
      this.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    this._handleEscape = (e) => {
      if (e.key === 'Escape' && this.get('editingEventId') === this.get('event.id')) {
        this.sendAction('cancelEdit');
      }
    };
    window.addEventListener('keydown', this._handleEscape);
  },

  didUpdate() {
    this._super(...arguments);

    if (this.get('editingEventId') === this.get('event.id')) {
      let $el = $(this.element);
      $el.addClass('event-update-animation');

      setTimeout(() => {
        $el.removeClass('event-update-animation');
      }, 1000);
    }
  },

  willDestroyElement() {
    window.removeEventListener('keydown', this._handleEscape);
    $(this.element).find('[title]').tooltip('dispose');
  },

  actions: {
    startEdit() {
      this.sendAction('startEdit', this.get('event'));
    },
    deleteEvent() {
      this.sendAction('deleteEvent', this.get('event'));
    },
    cancelEdit() {
      this.sendAction('cancelEdit');
    },
    saveEdit() {
      this.sendAction('saveEdit');
    }
  }
});
