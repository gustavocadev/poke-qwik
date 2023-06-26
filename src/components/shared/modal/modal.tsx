import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface ModalProps {
  showModal: boolean;
  persistent?: boolean;
  size: 'sm' | 'md' | 'lg';

  closeFn: PropFunction<() => void>;
}

export const Modal = component$<ModalProps>(
  ({ showModal, closeFn, persistent = false, size = 'md' }) => {
    useStylesScoped$(ModalStyles);

    return (
      // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
      <div
        class={`${showModal ? 'modal-background' : 'hidden'}`}
        onClick$={() => {
          if (!persistent) closeFn();
        }}
      >
        <div
          class={`modal-${size} modal-content`}
          onClick$={(e) => {
            e.stopPropagation();
          }}
        >
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button
                id="ok-btn"
                class="modal-button"
                onClick$={() => closeFn()}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
