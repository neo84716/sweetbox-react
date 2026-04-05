import { Icon } from '@iconify/react';

function CancelConfirmModal({
  cancelConfirmModalRef,
  cancelReminderModalRef,
  isOpen,
  onClose,
  handleOpenModal,
}) {
  return (
    <div
      className={`modal fade ${isOpen && 'show'}`}
      tabIndex="-1"
      aria-labelledby="cancelConfirmModalLabel"
      aria-hidden={!isOpen}
      aria-modal={isOpen}
      role="dialog"
      ref={cancelConfirmModalRef}
    >
      <div className="modal-dialog modal-fullscreen-sm-down modal-wide mx-auto px-sm-2">
        <div className="modal-content bg-transparent">
          <div className="d-flex flex-column flex-sm-row cancel-modal">
            {/* 取消訂閱確認 Modal 左側 */}
            <div className="cancel-modal-left bg-neutral-100 d-none d-sm-block">
              <div className="cancel-modal-left-content h-100 d-flex flex-column justify-content-between">
                {/* 結算明細 */}
                <div>
                  <p className="text-label mb-6 fw-bold ls-1 lh-sm">結算明細</p>
                  <div className="d-flex gap-4">
                    <img
                      className="align-self-start rounded-3"
                      src="./images/Subscription_Page/local_theme_pic_thumbnail.png"
                      alt="甜點盒圖片"
                    />
                    <div>
                      <p className="h6 ls-1 mb-6">在地甜點盒</p>
                      <ul className="d-flex flex-column gap-3">
                        <li>
                          <p className="mb-1 text-label">訂閱編號</p>
                          <p className="small">LC062HY2C7</p>
                        </li>
                        <li>
                          <p className="mb-1 text-label">已配送期數</p>
                          <p className="small">4/6期</p>
                        </li>
                        <li>
                          <p className="mb-1 text-label">訂閱數量</p>
                          <p className="small">1 盒</p>
                        </li>
                        <li>
                          <p className="mb-1 text-label">訂閱價格</p>
                          <p className="small">NT$700/月</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* 扣款方式 */}
                <div className="rounded-4 p-4 bg-neutral-200">
                  <p className="text-label mb-3">扣款方式</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="credit-card-logo">
                      <Icon icon="logos:visaelectron" width="28" height="16" />
                    </div>
                    <p>**** **** **** 1234</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 取消訂閱確認 Modal 右側 */}
            <div className="cancel-modal-right bg-neutral-200">
              <div className="cancel-modal-confirm-content">
                {/* 關閉按鈕 */}
                <div className="d-none d-sm-block text-end">
                  <button
                    type="button"
                    className="btn-close btn-close-md"
                    aria-label="Close"
                    onClick={() => onClose(cancelConfirmModalRef)}
                  ></button>
                </div>
                <div className="d-flex flex-column gap-8">
                  {/* 最後確認標題 */}
                  <div>
                    <h1 className="h4 ls-1 mb-2" id="cancelConfirmModalLabel">
                      最後確認
                    </h1>
                    <p className="small text-neutral-700">
                      提前解約將收取原價差額補貼，請確認以下結算明細
                    </p>
                  </div>
                  {/* 確認結算明細和補貼總額 */}
                  <div>
                    <div className="subscription-summary d-flex flex-column gap-1 mb-4">
                      <p className="subscription-summary-item">
                        <span>單期原價</span>
                        <span>$740</span>
                      </p>
                      <p className="subscription-summary-item">
                        <span>訂閱優惠價</span>
                        <span>$700</span>
                      </p>
                      <div className="subscription-info-divider"></div>
                      <p className="subscription-summary-item">
                        <span>每期優惠金額(價差)</span>
                        <span>$40</span>
                      </p>
                      <p className="subscription-summary-item">
                        <span>累計已配送期數</span>
                        <span>4期</span>
                      </p>
                    </div>
                    <div className="rounded-3 p-4 bg-primary-200 d-flex justify-content-between">
                      <span className="fs-8 fw-bold ls-1 lh-sm">
                        補貼總額計算
                      </span>
                      <span className="fs-8 fw-bold ls-1 lh-sm text-primary-600">
                        $40 X 4期 = $160
                      </span>
                    </div>
                  </div>
                  {/* 取消訂閱確認 Modal 桌面版按鈕 */}
                  <div className="d-none d-sm-flex flex-column gap-3">
                    <button
                      type="button"
                      className="btn btn-semantic-error rounded-pill px-6 py-3 ls-1 lh-sm"
                      onClick={() => onClose(cancelConfirmModalRef)}
                    >
                      確認扣款 NT$160 ，並取消訂閱
                    </button>
                    <button
                      type="button"
                      className="btn py-3 fs-8 text-neutral-700 border-0"
                      onClick={() => {
                        onClose(cancelConfirmModalRef);
                        handleOpenModal(
                          cancelReminderModalRef,
                          'cancelReminder',
                        );
                      }}
                    >
                      返回上一步
                    </button>
                  </div>
                  {/* 行動版扣款方式 */}
                  <div className="rounded-4 p-4 bg-neutral-100 d-sm-none">
                    <p className="text-label mb-3">扣款方式</p>
                    <div className="d-flex align-items-center gap-2">
                      <div className="py-1 px-2">
                        <Icon
                          icon="logos:visaelectron"
                          width="28"
                          height="16"
                        />
                      </div>
                      <span>**** **** **** 1234</span>
                    </div>
                  </div>
                  {/* 行動版訂閱編號卡片 */}
                  <div className="rounded-3 p-4 border border-neutral-400 d-sm-none">
                    {/* 訂閱編號 */}
                    <div className="d-flex gap-4 mb-4">
                      <img
                        className="rounded-3"
                        src="./images/Subscription_Page/local_theme_pic_thumbnail.png"
                        alt="甜點盒圖片"
                      />
                      <div>
                        <p className="fs-9 lh-sm ls-1 fw-bold text-neutral-600 mb-1">
                          訂閱編號：LC062HY2C7
                        </p>
                        <p className="fs-8 fw-bold lh-sm ls-1">在地甜點盒</p>
                      </div>
                    </div>
                    {/* 訂閱內容 */}
                    <div className="d-flex gap-4">
                      <div className="flex-grow-1">
                        <p className="text-label mb-1">數量</p>
                        <p>1 盒</p>
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-label mb-1">價格</p>
                        <p>NT$700/月</p>
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-label mb-1">已配送</p>
                        <p>4/6期</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 取消訂閱確認 Modal 行動板下方按鈕 */}
              <div className="payment-button-container d-flex gap-3 d-sm-none">
                <button
                  className="btn w-100 border-0 py-3 fs-8 text-neutral-700"
                  onClick={() => {
                    onClose(cancelConfirmModalRef);
                    handleOpenModal(cancelReminderModalRef, 'cancelReminder');
                  }}
                >
                  返回上一步
                </button>
                <button
                  className="btn btn-semantic-error btn-action py-3 w-100"
                  onClick={() => onClose(cancelConfirmModalRef)}
                >
                  扣款並取消訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelConfirmModal;
