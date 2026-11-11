"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { accountErrors, walletText } from "@/content/trading";
import type { Account, AccountError } from "@/domain/account/types";
import type { Result } from "@/domain/result";
import { parseDecimalInput } from "@/lib/parse-number";

type MoneyFormProps = {
  title: string;
  action: string;
  successText: string;
  onSubmit: (usd: number) => Result<Account, AccountError>;
};

export function MoneyForm({ title, action, successText, onSubmit }: MoneyFormProps) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = onSubmit(parseDecimalInput(value));
    setFeedback(result.ok ? { ok: true, text: successText } : { ok: false, text: accountErrors[result.error] });
    if (result.ok) setValue("");
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">{title}</h2>
        <TextField
          label={walletText.amountLabel}
          inputMode="decimal"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="0,00"
        />
        <Button type="submit">{action}</Button>
        <StatusMessage feedback={feedback} />
      </form>
    </Card>
  );
}
