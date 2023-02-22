import React from "react";

export default function TpsDescription() {
	return (
		<>
			<p>TPS는 초당 처리되는 트랜잭션 건수입니다.</p>
			<p>
				트랜잭션은 사용자의 요청이 애플리케이션 서버에서 응답을 보내기 위해
				처리되는 한 건의 과정을 의미합니다.
			</p>
			<p>
				5초마다 처리된 트랜잭션의 수를 초당 건수로 환산하여 차트로 표현하고
				있습니다. 최근 10분간의 TPS를 보여줍니다.
			</p>
		</>
	);
}
