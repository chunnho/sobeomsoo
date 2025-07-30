import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className 
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={styles.overlayEnter}
          enterFrom={styles.overlayEnterFrom}
          enterTo={styles.overlayEnterTo}
          leave={styles.overlayLeave}
          leaveFrom={styles.overlayLeaveFrom}
          leaveTo={styles.overlayLeaveTo}
        >
          <div className={styles.overlay} />
        </Transition.Child>

        <div className={styles.container}>
          <Transition.Child
            as={Fragment}
            enter={styles.contentEnter}
            enterFrom={styles.contentEnterFrom}
            enterTo={styles.contentEnterTo}
            leave={styles.contentLeave}
            leaveFrom={styles.contentLeaveFrom}
            leaveTo={styles.contentLeaveTo}
          >
            <Dialog.Panel className={`${styles.panel} ${className || ''}`}>
              <div className={styles.header}>
                <Dialog.Title className={styles.title}>
                  {title}
                </Dialog.Title>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className={styles.closeIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.content}>
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
} 