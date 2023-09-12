import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { User } from 'lucide-react';
import React, { isValidElement, useState } from 'react';

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
    defaultStep = 0,
    onChangeStep,
    steps,
    onFinish,
    blocksIn
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState<number>(defaultStep);

    const handleChangeStep = (newStep: number) => {
        if (blocksIn?.[newStep]) return;
        setCurrentStep(newStep);
        onChangeStep?.(newStep);
    };

    return (
        <>
            <div className="mx-4 py-10">
                <div className="flex items-center">
                    {steps.map((stepItem, index) => {
                        const isActive = currentStep === index;
                        const labelKey = `${index}_label`;
                        const isEnable = blocksIn?.[index];
                        const isElementType = isValidElement(stepItem.label);
                        console.log(isEnable);

                        const renderLabel = () => {
                            if (isElementType) return stepItem.label;
                            if (typeof stepItem.label === 'string')
                                return stepItem.label;
                            if (typeof stepItem.label === 'function')
                                return stepItem.label(isActive);
                            return null;
                        };

                        const isFirstItem = index === 0;

                        return (
                            <React.Fragment key={labelKey}>
                                {!isFirstItem && (
                                    <div
                                        className={clsx([
                                            'flex-auto border-t-2 transition duration-500 ease-in-out',
                                            {
                                                'border-blue-600':
                                                    (blocksIn?.[0] &&
                                                        blocksIn?.[1]) ||
                                                    blocksIn?.[2],
                                                'border-gray-400': !isEnable
                                            }
                                        ])}
                                    />
                                )}
                                <div
                                    className={clsx([
                                        'flex items-center text-blue-600 relative',
                                        {
                                            'text-white': isActive
                                        }
                                    ])}
                                    onClick={() => handleChangeStep(index)}
                                >
                                    <div
                                        className={clsx([
                                            'rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-blue-600 flex justify-center items-center',
                                            {
                                                'bg-blue-600': isActive,
                                                'text-gray-400': !isActive,
                                                'pointer-events-none': isEnable,
                                                'hover:opacity-85': !isEnable
                                            }
                                        ])}
                                    >
                                        <User />
                                    </div>
                                    <div
                                        className={clsx([
                                            'absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ',
                                            {
                                                'text-gray-400': !isActive,
                                                'text-blue-600': isActive
                                            }
                                        ])}
                                    >
                                        {renderLabel() as React.ReactNode}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div>
                {steps.map((stepItem, index) => {
                    const isActive = currentStep === index;
                    const contentKey = `${index}_content`;
                    const isDisabledNext = index === steps.length - 1;
                    const isDisabledPrev = index <= 0;
                    const isEnable = blocksIn?.[index];

                    const handleNextStep = () => {
                        if (!isEnable) return;
                        if (isDisabledNext) {
                            onFinish?.();
                        } else {
                            setCurrentStep((prevStep) => prevStep + 1);
                        }
                    };

                    const handlePrevStep = () => {
                        if (isDisabledPrev) return;
                        setCurrentStep((prevStep) => prevStep - 1);
                    };

                    const buttonLabel = isDisabledNext ? 'Finish' : 'Next';

                    return (
                        isActive && (
                            <div key={contentKey}>
                                {stepItem.content({
                                    onChangeNextStep: handleNextStep,
                                    onChangePrevStep: handlePrevStep,
                                    isDisabledNext,
                                    isDisabledPrev
                                })}

                                {!stepItem.isCustomStepActionButtons ? (
                                    <div className="flex w-full justify-end self-end gap-3">
                                        <Button
                                            disabled={isDisabledPrev}
                                            onClick={handlePrevStep}
                                        >
                                            Prev
                                        </Button>

                                        <Button
                                            disabled={!isEnable}
                                            onClick={handleNextStep}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        )
                    );
                })}
            </div>
        </>
    );
}
