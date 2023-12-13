function result() {
    let num1 = parseInt(document.getElementById('number1').value);
    let num2 = parseInt(document.getElementById('number2').value);
    let num3 = parseInt(document.getElementById('number3').value);

    if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
        let code = calculate(num1, num2, num3);
        document.getElementById("result").innerText = code !== null ? `${code}로 암호화 되었습니다.` : "계산된 값이 없습니다.";
    } else {
        document.getElementById("result").innerText = "숫자를 입력하세요";
    }
}

function calculate(num1, num2, num3) {
    let N = num2 * num3;
    let Euler = (num2 - 1) * (num3 - 1);
    let e = findSmallestCoprime(Euler);
    let code = findCode(e, num1, N);

    return code;
}

function findSmallestCoprime(Euler) {
    for (let e = 2; e < Euler; e++) {
        if (gcd(e, Euler) === 1) {
            return e;
        }
    }
}

function findCode(e, num1, N) {
    let code = null;

    for (let i = 2; i < N; i++) {
        if (modularExponentiation(num1, e, N) === i) {
            code = i;
            break;
        }
    }

    return code;
}

function modularExponentiation(base, exponent, modulus) {
    if (modulus === 1) return 0;

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }

        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

result();