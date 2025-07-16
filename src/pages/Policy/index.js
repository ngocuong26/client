import { useParams } from "react-router-dom";
import styles from "./Policy.module.scss";

function Policy() {
    const {type} = useParams();


    return (
        <div className={styles.container_policy}>
            {type === 'chinh-sach-bao-mat' && (
                <>
                    <h3>BẢO VỆ THÔNG TIN CÁ NHÂN KHÁCH HÀNG</h3>
                    <h4>I/ Bảo Vệ Thông Tin Cá Nhân Khách Hàng</h4>
                    <p><strong>VPP </strong>cam kết sẽ bảo mật những thông tin mang tính riêng tư của khách hàng. Khách hàng vui lòng đọc bản “Chính sách bảo mật” dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập:</p>
                    <h4>1. Mục đích và phạm vi thu thập</h4>
                    <p>– Để truy cập và sử dụng một số dịch vụ tại vpp.vn , bạn có thể sẽ được yêu cầu đăng ký với chúng tôi thông tin cá nhân (Email, Họ tên, Số ĐT liên lạc, Tên đơn vị đang công tác…). Mọi thông tin khai báo phải đảm bảo tính chính xác và hợp pháp. vpp.vn không chịu mọi trách nhiệm liên quan đến pháp luật của thông tin khai báo.</p>
                    <p>– Chúng tôi cũng có thể thu thập thông tin về số lần viếng thăm, bao gồm số trang bạn xem, số links (liên kết) bạn click và những thông tin khác liên quan đến việc kết nối đến site vpp.vn</p>
                    <p>– Ngoài ra, chúng tôi cũng có thể thu thập thông tin và nhu cầu của khách hàng thông qua quá trình trao đổi tại các sự kiện offline mà khách hàng và chúng tôi có dịp gặp mặt và trao đổi.</p>
                    <h4>2. Phạm vi sử dụng thông tin</h4>
                    <p>vpp.vn thu thập và sử dụng thông tin cá nhân bạn với mục đích phù hợp và hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này.</p>
                    <p>Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ trực tiếp với bạn dưới các hình thức như: gởi thư ngỏ, đơn đặt hàng, thư cảm ơn, sms, thông tin về kỹ thuật và bảo mật…</p>
                    <h4>3. Thời gian lưu trữ thông tin</h4>
                    <p>Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của vpp.vn .</p>
                    <h4>4. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân</h4>
                    <p>+ Gọi điện thoại đến tổng đài chăm sóc khách hàng 1999-8666 / 1999-8888, bằng nghiệp vụ chuyên môn xác định thông tin cá nhân và nhân viên tổng đài sẽ hỗ trợ chỉnh sửa thay người dùng</p>
                    <p>+ Để lại bình luận hoặc gửi góp ý trực tiếp từ website vpp.vn , quản trị viên kiểm tra thông tin và liên lạc lại với người dùng để xác nhận thông tin 1 lần nữa và quản trị viên chỉnh sửa thông tin cho người dùng.</p>
                    <h4>5. Cam kết bảo mật thông tin cá nhân khách hàng</h4>

                    <p>Thông tin cá nhân của thành viên trên vpp.vn được vpp.vn cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của vpp.vn. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.</p>

                    <p>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.</p>

                    <p>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, vpp.vn sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.</p>

                    <p>Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của vpp.vn.</p>

                    <p>Ban quản lý vpp.vn yêu cầu các cá nhân khi đăng ký/mua hàng là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, điện thoại, số tài khoản, số thẻ thanh toán, tên đơn vị công tác… và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý vpp.vn không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.</p>

                    <h4>II/ Quản lý thông tin xấu</h4>

                    <h4>Quy định thành viên</h4>

                    <p>Thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu của mình. Thành viên có trách nhiệm thông báo kịp thời cho website vpp.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.</p>

                    <p>Thành viên không được thay đổi, chỉnh sửa, gán ghép, copy, truyền bá, phân phối, cung cấp và tạo những công cụ tương tự của dịch vụ do website vpp.vn cung cấp cho một bên thứ ba nếu không được sự đồng ý của website vpp.vn trong bản Quy chế này.</p>

                    <p>Thành viên không được hành động gây mất uy tín của website vpp.vn dưới mọi hình thức như gây mất đoàn kết giữa các thành viên bằng cách sử dụng tên đăng ký thứ hai, thông qua một bên thứ ba hoặc tuyên truyền, phổ biến những thông tin không có lợi cho uy tín của website TMĐT vpp.vn.</p>

                </>
            )}

            {type === 'chinh-sach-doi-tra' && (
                <>
                    <h4>CHÍNH SÁCH KIỂM HÀNG VÀ ĐỔI TRẢ HÀNG TẠI VĂN PHÒNG PHẨM VPP NHƯ SAU:</h4>

                    <h4>1. Chính sách kiểm hàng</h4>

                    <p>Khi nhận hàng quý khách có quyền yêu cầu nhân viên giao hàng mở cho kiểm.</p>

                    <p>Trường hợp đơn hàng đặt mà bên bán giao không đúng loại sản phẩm, quý khách có quyền trả hàng và không thanh toán tiền.</p>

                    <p>Trường hợp quý khách đã thanh toán trước nhưng đơn hàng không đúng, quý khách yêu cầu hoàn lại hoặc giao lại đơn mới như đã đặt.</p>

                    <h4>2. Trường hợp được đổi / trả hàng</h4>

                    <p>Hàng hóa không đúng số lượng, chủng loại, quy cách, mẫu mã như Quý khách đã đặt hàng.</p>

                    <p>Hàng hóa bị hư hỏng như bể vỡ, rách,…</p>

                    <p>Hàng hóa không đạt chất lượng, quá hạn sử dụng, hết hạn bảo hành theo quy định của nhà sản xuất.</p>

                    <p>Thời hạn đổi / trả hàng: Quý khách vui lòng kiểm tra hàng khi nhận và trả ngay cho Nhân viên giao hàng khi phát hiện sản phẩm không đạt, hoặc phản hồi cho Nhân viên bán hàng trong vòng 12 giờ.</p>

                    <h4>3. Trường hợp không được đổi / trả hàng</h4>

                    <p>Quý khách muốn thay đổi số lượng, chủng loại, quy cách, mẫu mã nhưng không thông báo trước khi giao hàng.</p>

                    <p>Quý khách tự làm ảnh hưởng đến sản phẩm như rách bao bì, bể vỡ,…</p>

                    <p>Hàng hóa không có chứng từ kèm theo như: Phiếu xuất kho, hóa đơn VAT,…</p>

                    <h4>4. Thời gian đổi / trả hàng cho khách hàng</h4>

                    <p>Các sản phẩm do VPP cung cấp: Quý khách sẽ được đổi / trả hàng trong vòng 7 ngày kể từ ngày nhận đủ thông tin và chứng từ.</p>

                    <p>Chúng tôi không hoàn trả lại chi phí vận chuyển, chi phí giao dịch,… (nếu có) trong tất cả các trường hợp đổi / trả hàng.</p>

                </>
            )}

            {type === 'quy-dinh-chung' && (
                <>
                    <h4>ĐIỀU KHOẢN QUY ĐỊNH CHUNG TẠI WEBSITE VĂN PHÒNG PHẨM VPP</h4>

                    <p>Khi Quý khách truy cập vào trang web của chúng tôi có nghĩa là Quý khách đã đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Quy định và Điều kiện sử dụng, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên web mà không cần thông báo trước. Và khi Quý khách tiếp tục sử dụng trang web, sau khi các thay đổi được đăng tải, có nghĩa là Quý khách chấp nhận với những thay đổi đó. Quý khách vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.</p>

                    <p>Xin vui lòng đọc kỹ trước khi quyết định đồng ý mua hàng:</p>

                    <h4>1. Hướng dẫn sử dụng web</h4>

                    <p>Khi vào web của chúng tôi, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Chúng tôi cấp giấy phép sử dụng để bạn có thể mua sắm trên web trong khuôn khổ Điều khoản và Điều kiện sử dụng đã đề ra.</p>

                    <p>Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây, chúng tôi sẽ hủy giấy phép của bạn mà không cần báo trước.</p>

                    <p>Trang web này chỉ dùng để cung cấp thông tin sản phẩm, chúng tôi không phải nhà sản xuất nên những nhận xét hiển thị trên web là ý kiến cá nhân của khách hàng, không phải của chúng tôi.</p>

                    <p>Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên web. Hơn nữa, quý khách phải thông báo cho chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.</p>

                    <p>Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Sau đó, nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.</p>

                    <h4>2. Ý kiến khách hàng</h4>

                    <p>Tất cả nội dung trang web và ý kiến phê bình của Quý khách đều là tài sản của chúng tôi. Nếu chúng tôi phát hiện bất kỳ thông tin giả mạo nào, chúng tôi sẽ khoá tài khoản của quý khách ngay lập tức hoặc áp dụng các biện pháp khác theo quy định của pháp luật Việt Nam.</p>

                    <h4>3. Chấp nhận đơn hàng và giá cả</h4>

                    <p>Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ lý do gì liên quan đến lỗi kỹ thuật, hệ thống một cách khách quan vào bất kỳ lúc nào.</p>

                    <p>Để đảm bảo tính công bằng cho khách hàng là người tiêu dùng cuối cùng của Hoangthienan.vn, chúng tôi cũng sẽ từ chối các đơn hàng không nhằm mục đích sử dụng cho cá nhân, mua hàng số lượng nhiều hoặc với mục đích mua đi bán lại.</p>

                    <p>Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra, ví dụ như trường hợp giá sản phẩm không hiển thị chính xác trên trang web hoặc sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách. Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã thanh toán.</p>

                    <h4>4. Thương hiệu và bản quyền</h4>

                    <p>Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của chúng tôi. Toàn bộ nội dung của trang web được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế. Bản quyền đã được bảo lưu.</p>

                    <h4>5. Quyền pháp lý</h4>

                    <p>Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam sẽ giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép trang web này.</p>

                    <h4>6. Quy định về bảo mật</h4>

                    <p>Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất để bảo vệ thông tin và việc thanh toán của quý khách. Thông tin của quý khách trong quá trình thanh toán sẽ được mã hóa để đảm bảo an toàn. Sau khi quý khách hoàn thành quá trình đặt hàng, quý khách sẽ thoát khỏi chế độ an toàn.</p>

                    <p>Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.</p>

                    <p>Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.</p>

                </>
            )}
        </div>

    )
}

export default Policy;