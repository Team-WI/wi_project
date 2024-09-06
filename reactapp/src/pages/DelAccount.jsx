// 회원탈퇴 페이지 컴포넌트
//import React, {useState} from "react";
import './DelAccount.css';
import axios from "axios";


const DelAccount = () => {
   // const [status, setStatus] = useState('');
    
   
    const handleDelAccount = async () => {
       
        const loginId = sessionStorage.getItem('id'); 
        try {
            
            const response = await axios.delete(`http://43.203.208.22:3000/api/users/${loginId}`);
              console.log(response.httpStatus);

                if(response.httpStatus.ok) {
                    alert('정상적으로 회원탈퇴 되었습니다.');
                    window.location.replace("/");
                } else {
                  console.error();  
                }

        } catch (error) {
            console.log('계정삭제 에러: ', error.message);
        }
    };
    
    return(
        <div className="del-account">
            <div className="del-account-headline">
            <h2>회원탈퇴</h2>
            <br/>
            <span>회원 탈퇴 신청 시 아래 내용을 반드시 확인해주세요.</span>
            </div>
        <div className="del-notice-content">
            <dl className="del-dl">
            <dt>탈퇴 시 삭제되는 내용</dt>
            <dd>탈퇴 시 고객님께서 보유하셨던 쿠폰과 마일리지는 모두 소멸되며 환불할 수 없습니다. 또한 다른 계정으로 양도 또는 이관할 수 없습니다.
            탈퇴한 계정 및 이용 내역은 복구할 수 없으니 탈퇴 시 유의하시기 바랍니다.</dd>
            <br/>
            <dt>탈퇴 시 보관 또는 유지되는 항목</dt>
            <dd>
            탈퇴 시 법령에 따라 보관해야 하는 항목은 관련 법령에 따라 일정 기간 보관하며 다른 목적으로 이용하지 않습니다. 
            전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 대금결제 및 재화 등의 공급에 관한 기록 5년, 계약 또는 청약철회 등에 관한 기록 5년, 소비자의 불만 또는 분쟁처리에 관한 기록은 3년동안 보관됩니다.
            아이디(이메일), 이메일, 비밀번호는 부정 이용ㆍ탈퇴 방지를 위해 탈퇴 요청 시 7일 간 별도 보관 후 파기합니다.
            탈퇴 후에도 서비스에 등록한 게시물 및 댓글은 그대로 남아 있습니다. 상품 리뷰, 게시글, 이벤트 댓글 등은 삭제되지 않습니다. 
            탈퇴 후에는 회원정보가 삭제되어 본인 여부를 확인할 수 없으므로 게시글을 임의로 삭제해드릴 수 없습니다. 먼저 해당 게시물을 삭제하신 후 탈퇴를 신청하시기 바랍니다.
            </dd>
            <br/>
            <dt>탈퇴 불가 및 기타 유의사항</dt>
            <dd>진행 중인 주문이 있는 경우에는 탈퇴할 수 없습니다. 이미 결제가 완료된 건은 탈퇴로 취소되지 않으므로 주문 취소 후 탈퇴를 시도하시고, 주문 내역을 미리 확인해주세요.
            동일 아이디는 탈퇴 후 7일 간 재사용할 수 없습니다.</dd>
            </dl>
        </div>
        <div className="survey-content">
        <span>의견을 남겨주시면 소중히 새겨듣고 오래 이용할 수 있는 서비스로 개선하겠습니다.</span>
        <textarea className="survey-textarea" placeholder="탈퇴 사유 및 불편한점을 알려주세요."></textarea>
        <button onClick={handleDelAccount}>탈퇴하기</button>
        </div>
        </div>
    );
};

export default DelAccount;