"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { cart } from "../../tools/cart";
import footerStyles from "./Footer.module.css";

function playConfetti() {
  const count = 250;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: {
    spread: number,
    startVelocity?: number,
    decay?: number,
    scalar?: number
  }): void {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export default function CheckoutButton() {
  const router: AppRouterInstance = useRouter();

  function checkout(): void {
    if (cart.getPaymentMethod()) {
      cart.purchase().then((success: boolean): void => {
        if (!success) {
          alert("Transaction Failed");
          return;
        }

        playConfetti();
        router.push("/");
      });
    }
  }

  return (
    <button
      className={footerStyles.button}
      onClick={checkout}>
      Finish
    </button>
  );
};