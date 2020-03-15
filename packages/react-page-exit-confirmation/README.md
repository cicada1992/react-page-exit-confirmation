# react-page-exit-confirmation
A confirmation modal that triggers when you route or exit the page.

## Getting Started
```
npm install react-page-exit-confirmation --save

import PageExitConfirmation from 'react-page-exit-confirmation';
```

## Peer Dependancies
- react
- react-dom
- react-router-dom

## Demo
https://cicada1992.github.io/react-page-exit-confirmation/

#### Used code in demo
```
const shouldConfirm = true;
const modalContent = (
  <>
    <div>You have unsaved changes that will be lost if you leave.</div>
    <div>Is it okay?</div>
  </>
)

<PageExitConfirmation
  shouldConfirm={shouldConfirm}
  history={history}
  modalHeader="Leave this page?"
  modalContent={modalContent}
  modalStyle={{
    background: "#fff",
    borderRadius: 0
  }}
  leaveButtonStyle={{ background: "#5d95ff", color: "#fff" }}
/>
```

## Props
| Property | Type | Required? | Description | Default Value 
|:---|:---|:---:|:---|:---|
| shouldConfirm | boolean | ✓ | Condition to show confirmation dialog
| history | Pick<RouteComponentProps, "history"> | ✓ | History object to route (react-router-dom)
| modalHeader | React.ReactNode |  | Modal header (text \| element) | Leave this page?
| modalContent | React.ReactNode |  | Modal content (text \| element) | You have unsaved changes that will be lost if you leave.
| modalStyle | React.CSSProperties |  | Custom modal style | Refer DEFAULT_MODAL_STYLE
| leaveButtonStyle | React.CSSProperties |  | Custom leave btn style | Refer DEAFULT_BUTTON_STYLE
| cancelButtonStyle | React.CSSProperties |  | Custom cancel btn style | Refer DEAFULT_BUTTON_STYLE
```
const DEFAULT_MODAL_STYLE = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  width: 500,
  padding: "30px 20px",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.37)"
};

const DEAFULT_BUTTON_STYLE = {
  width: 90,
  height: 30
};
```

## Simple Example
```
<PageExitConfirmation
  shouldConfirm={shouldConfirm}
  history={history}
/>
```