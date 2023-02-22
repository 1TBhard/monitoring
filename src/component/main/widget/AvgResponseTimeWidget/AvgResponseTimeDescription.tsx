import React from "react";

export default function AvgResponseTimeDescription() {
	return (
		<>
			<p>
				애플리케이션 서버가 사용자에게 요청 결과를 반환하는 데 걸리는
				시간입니다. 와탭의 서비스는 5초 간격으로 트랜잭션의 평균 응답시간을
				계산합니다.
			</p>

			<p>평균 응답시간은 튜닝 지표로서 의미를 가집니다.</p>
		</>
	);
}
