import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { isValidElement, useState } from 'react';

interface StepperProps {
    defaultStep?: number;
    step?: number;
    onChangeStep?: (step: number) => void;
    onFinish?: () => void;
    steps: StepperStep[];
    blocksIn?: boolean[];
}

interface StepperRenderContentFnProps {
    onChangeNextStep: () => void;
    onChangePrevStep: () => void;
    isDisabledPrev: boolean;
    isDisabledNext: boolean;
}

type StepperRenderContentFn = (
    props: StepperRenderContentFnProps
) => React.ReactNode;

export interface StepperStep {
    label: React.ReactNode | string | ((isActive: boolean) => React.ReactNode);
    content: StepperRenderContentFn;
    isCustomStepActionButtons?: boolean;
}

export default function Stepper({
    defaultStep,
    onChangeStep,
    step,
    steps,
    onFinish,
    blocksIn
}: StepperProps) {
    const [_step, _setStep] = useState<number>(defaultStep || 0);

    function handleChangeStep(current: number) {
        _setStep(current);
        onChangeStep?.(current);
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between gap-3">
                {steps.map((stepLabel, index) => {
                    const isActive = (step || _step) === index;
                    const labelKey = `${index}_label`;

                    const isBlock = blocksIn && blocksIn[index];

                    const isElementType = isValidElement(stepLabel.label);

                    function _handleChangeStep(index: number) {
                        if (isBlock) return;

                        handleChangeStep(index);
                    }

                    const renderLabel = () => {
                        if (isElementType) return stepLabel.label;

                        if (typeof stepLabel.label === 'string')
                            return stepLabel.label;

                        if (typeof stepLabel.label === 'function')
                            return stepLabel.label(isActive);

                        return null;
                    };

                    return (
                        <p
                            key={labelKey}
                            className={clsx([
                                'cursor-pointer',
                                {
                                    'font-bold text-blue-400': isActive,
                                    'text-gray-400': !isActive,
                                    'pointer-events-none': isBlock,
                                    'hover:opacity-75': !isBlock
                                }
                            ])}
                            onClick={() => _handleChangeStep(index)}
                        >
                            {renderLabel() as React.ReactNode}
                        </p>
                    );
                })}
            </div>

            <div>
                {steps.map((stepContent, index) => {
                    const isActive = (step || _step) === index;
                    const contentKey = `${index}_content`;

                    const isDisabledNext = index === steps.length - 1;
                    const isDisabledPrev = index <= 0;

                    const isBlock = blocksIn && blocksIn[index];

                    function handleNextStep() {
                        if (isBlock) return;

                        if (isDisabledNext) {
                            onFinish?.();
                            return;
                        }

                        _setStep((prev) => prev + 1);
                    }

                    function handlePrevStep() {
                        if (isDisabledPrev) return;

                        _setStep((prev) => prev - 1);
                    }

                    const buttonLabel = isDisabledNext ? 'Finish' : 'Next';

                    if (isActive)
                        return (
                            <div key={contentKey}>
                                {stepContent.content({
                                    onChangeNextStep: handleNextStep,
                                    onChangePrevStep: handlePrevStep,
                                    isDisabledNext,
                                    isDisabledPrev
                                })}

                                {!stepContent?.isCustomStepActionButtons && (
                                    <div className="flex w-full justify-end self-end gap-3">
                                        <Button
                                            disabled={isDisabledPrev}
                                            onClick={handlePrevStep}
                                        >
                                            Prev Page
                                        </Button>

                                        <Button
                                            disabled={isBlock}
                                            onClick={handleNextStep}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );

                    return null;
                })}
            </div>
        </div>
    );
}
