import { EmailTemplate } from "~/server/app/mailerService";

const resetPassword = function (username: string, callbackUrl: string): EmailTemplate {
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <!--[if (gte mso 9)|(IE)]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for Windows phone 8 -->
    <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
    <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
    <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
    <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
    <meta name="color-scheme" content="only">
    <title></title>
    <style type="text/css">
        /*Basics*/
        body {margin:0 !important; padding: 20px 70px !important; display:block !important; -webkit-text-size-adjust:none;}
        table {border-spacing:0; mso-table-lspace:0; mso-table-rspace:0;}
        table td {border-collapse: collapse;mso-line-height-rule:exactly;}
        td img {-ms-interpolation-mode:bicubic; width:auto; height:auto; margin:auto; display:block!important; border:0;}
        td p {margin:0; padding:0;}
        td div {margin:0; padding:0;}
        td a {text-decoration:none; color: inherit;}
        /* iOS black LINKS */
        a[x-apple-data-detectors] {color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;}
        /*Gmail black links*/
        u + #body a {color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
        /*Buttons fix*/
        .ios-footer a {color:#aaaaaa !important;text-decoration:none;}
    </style>
<body>
<table class="mail-header" style="width: 100%; margin-top: 20px;">
    <tr>
        <td class="mail-header__logo" style="width: 100%; text-align: center;">
            <a href="" style="display: inline-block;">
                <img src="cid:logo" alt="Logo" style="width: 100px; height: auto; display: block; margin: 0 auto;">
            </a>
        </td>
    </tr>
    <tr class="mail-header__title" style="width: 100%; margin-top: 40px;">
        <td style="width: 100%; text-align: center;">
            <h1 style="font-size: 24px; line-height: 30px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                Hi ${username},
            </h1>
        </td>
    </tr>
</table>
<table class="mail-content" style="width: 100%; margin-top: 20px;">
    <tr>
        <td style="width: 100%; text-align: left;">
            <p style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                A request to reset your password has been made. If you did not make this request, please ignore this email.
            </p>
        </td>
    </tr>
    <tr>
        <td style="width: 100%; text-align: left; padding-top: 20px">
            <p style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                To reset your password, please click the button below.
            </p>
        </td>
    </tr>
    <tr>
        <td style="width: 100%; text-align: center;">
            <a href="${callbackUrl}" style="display: inline-block; margin-top: 20px; margin-bottom: 20px; padding: 10px 20px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 16px; line-height: 24px; font-weight: 400; border-radius: 4px;">
                Reset Password
            </a>
        </td>
    </tr>
</table>
<table class="mail-footer" style="width: 100%;">
  <tr>
    <td style="width: 100%; text-align: center; padding: 35px;">
      <p style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
        Thanks,
      </p>
      <p style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
        Vue Template
      </p>
    </td>
  </tr>
  <tr class="utils-links">
    <td style="width: 100%; padding-top: 20px; text-align: center; border-top: 1px solid #000000;">
      <a href="" style="display: inline-block; margin: 0 5px;">
                <span style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                    Contact Us
                </span>
      </a>
      <a href="" style="display: inline-block; margin: 0 5px;">
                <span style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                    Privacy Policy
                </span>
      </a>
      <a href="" style="display: inline-block; margin: 0 5px;">
                <span style="font-size: 16px; line-height: 24px; color: #000000; font-weight: 400; margin: 0; padding: 0;">
                    Terms of Service
                </span>
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;
  const text = `
        Verify Email, A request to create your ${username} account was received.
        Use this OTP to confirm your account and log in`;
  return {
    html,
    text,
  };
};

export default resetPassword;
