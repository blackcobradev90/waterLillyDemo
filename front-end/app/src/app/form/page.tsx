"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"

const userFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone number is required"),
    postCode: z.string().min(1, "Post code is required"),
    gender: z.string().min(1, "Gender is required"),
    birthday: z.string().min(1, "Birthday is required"),
    expectedIncome: z.enum(["LESS_THAN_50K", "BETWEEN_50K_100K", "ABOVE_100K"]),
    pregnantOrAdopting: z.boolean(),
    coverage: z.enum(["MYSELF", "FAMILY"]),
    tobaccoUser: z.boolean(),
    majorMedicalCondition: z.boolean(),
})

type UserFormData = z.infer<typeof userFormSchema>

const steps = [
    { title: "Personal Information", fields: ["firstName", "lastName", "email"] },
    { title: "Contact Details", fields: ["address", "phone", "postCode"] },
    { title: "Demographics", fields: ["gender", "birthday", "expectedIncome"] },
    { title: "Health & Coverage", fields: ["pregnantOrAdopting", "coverage", "tobaccoUser", "majorMedicalCondition"] },
]

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: "",
            postCode: "",
            gender: "",
            birthday: "",
            expectedIncome: "LESS_THAN_50K",
            pregnantOrAdopting: false,
            coverage: "MYSELF",
            tobaccoUser: false,
            majorMedicalCondition: false,
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = form

    const nextStep = async () => {
        const currentFields = steps[currentStep].fields as (keyof UserFormData)[]
        const isValid = await trigger(currentFields)

        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const onSubmit = async (data: UserFormData) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("Form submitted:", data)
        setIsSubmitting(false)
    }

    const progress = ((currentStep + 1) / steps.length) * 100

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl w-full space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif text-2xl text-center">{steps[currentStep].title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 1: Personal Information */}
                            {currentStep === 0 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                {...register("firstName")}
                                                className={errors.firstName ? "border-destructive" : ""}
                                            />
                                            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                {...register("lastName")}
                                                className={errors.lastName ? "border-destructive" : ""}
                                            />
                                            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className={errors.email ? "border-destructive" : ""}
                                        />
                                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Contact Details */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            {...register("address")}
                                            className={errors.address ? "border-destructive" : ""}
                                        />
                                        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postCode">Post Code</Label>
                                            <Input
                                                id="postCode"
                                                {...register("postCode")}
                                                className={errors.postCode ? "border-destructive" : ""}
                                            />
                                            {errors.postCode && <p className="text-sm text-destructive">{errors.postCode.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Demographics */}
                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <Select onValueChange={(value) => setValue("gender", value)}>
                                                <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="birthday">Birthday</Label>
                                            <Input
                                                id="birthday"
                                                type="date"
                                                {...register("birthday")}
                                                className={errors.birthday ? "border-destructive" : ""}
                                            />
                                            {errors.birthday && <p className="text-sm text-destructive">{errors.birthday.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expectedIncome">Expected Annual Income</Label>
                                        <Select onValueChange={(value) => setValue("expectedIncome", value as any)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select income range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LESS_THAN_50K">Less than $50,000</SelectItem>
                                                <SelectItem value="BETWEEN_50K_100K">$50,000 - $100,000</SelectItem>
                                                <SelectItem value="ABOVE_100K">Above $100,000</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Health & Coverage */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Coverage Type</Label>
                                        <Select onValueChange={(value) => setValue("coverage", value as any)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select coverage type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MYSELF">Myself only</SelectItem>
                                                <SelectItem value="FAMILY">Family coverage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="pregnantOrAdopting"
                                                checked={watch("pregnantOrAdopting")}
                                                onCheckedChange={(checked) => setValue("pregnantOrAdopting", !!checked)}
                                            />
                                            <Label htmlFor="pregnantOrAdopting">Are you currently pregnant or planning to adopt?</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="tobaccoUser"
                                                checked={watch("tobaccoUser")}
                                                onCheckedChange={(checked) => setValue("tobaccoUser", !!checked)}
                                            />
                                            <Label htmlFor="tobaccoUser">Do you use tobacco products?</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="majorMedicalCondition"
                                                checked={watch("majorMedicalCondition")}
                                                onCheckedChange={(checked) => setValue("majorMedicalCondition", !!checked)}
                                            />
                                            <Label htmlFor="majorMedicalCondition">Do you have any major medical conditions?</Label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="flex items-center gap-2 bg-transparent"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                {currentStep < steps.length - 1 ? (
                                    <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
